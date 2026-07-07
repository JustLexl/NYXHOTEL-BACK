import * as firebase from "../../shared/database/firebase";
import { BaseError } from "../../shared/classes/base-error";
import { ListaReportesDto } from "./listaReportesDto";
import { createReporteMongo, deleteReporteMongo, getAllReportesMongo, updateReporteMongo, getReporteByIdMongo } from "./listaReportesModel";
import { connect } from "../../shared/database/mongodb";

const db = firebase.firestore();

export async function getReportes() {

  try {
    const list = await getAllReportesMongo();
    return list.map((item: any) => ({
      ...item,
      _id: item._id.toString(),
      area: item.area || ''
    }));
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getReportes");
  }
}

export async function updateReporte(id: string, reporte: Partial<ListaReportesDto>) {
  try {
    const now = new Date();
    const reporteConUpdateAt = { ...reporte, updatedAt: now };
    const mongoResponse = await updateReporteMongo(id, reporteConUpdateAt);

 

    return mongoResponse.upsertedId || id;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "updateReporte");
  }
}


export async function deleteReporte(id: string) {
  try {
    await deleteReporteMongo(id);

    return true;
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "deleteReporte");
  }
}

async function calculateStats(params: { area: string, reportType: string, startDate?: Date, endDate?: Date, targetName?: string, targetStatus?: string }) {
  const mongodb = await connect();
  const horasCollection = mongodb.collection("Hours");

  const query: any = {};
  query.isDeleted = { $ne: true };

  let start = params.startDate ? new Date(params.startDate) : undefined;
  let end = params.endDate ? new Date(params.endDate) : undefined;

  const now = new Date();
  if (params.reportType === 'semanal') {
    start = new Date(now);
    start.setDate(now.getDate() - 7);
    end = now;
  } else if (params.reportType === 'mensual' || params.reportType === 'mensual por semana') {
    start = new Date(now);
    start.setMonth(now.getMonth() - 1);
    end = now;
  }

  if (params.reportType !== 'historico' && start && end) {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    
    query.$or = [
      { date: { $gte: start, $lte: end } },
      { date: { $gte: start.toISOString(), $lte: end.toISOString() } }
    ];
  }

  let clientProjectNames = new Set<string>();
  if (params.area && params.area.toLowerCase() === 'por cliente' && params.targetName) {
      const cicdClientProjs = await mongodb.collection("CICD").find({ client: params.targetName, isDeleted: { $ne: true } }, { projection: { name: 1 } }).toArray();
      const mktClientProjs = await mongodb.collection("Marketing").find({ client: params.targetName, isDeleted: { $ne: true } }, { projection: { name: 1 } }).toArray();
      const devClientProjs = await mongodb.collection("Projects").find({ client: params.targetName, isDeleted: { $ne: true } }, { projection: { projectName: 1, name: 1 } }).toArray();
      const hostClientProjs = await mongodb.collection("Hostings").find({ client: params.targetName, isDeleted: { $ne: true } }, { projection: { domain: 1 } }).toArray();
      
      cicdClientProjs.forEach(p => clientProjectNames.add((p.name || '').toLowerCase().trim()));
      mktClientProjs.forEach(p => clientProjectNames.add((p.name || '').toLowerCase().trim()));
      devClientProjs.forEach(p => clientProjectNames.add((p.projectName || p.name || '').toLowerCase().trim()));
      hostClientProjs.forEach(p => clientProjectNames.add((p.domain || '').toLowerCase().trim()));
      
      console.log(`==> Client: '${params.targetName}'`);
      console.log(`==> Found CI/CD projs: ${cicdClientProjs.length}`);
      console.log(`==> Found Mkt projs: ${mktClientProjs.length}`);
      console.log(`==> Found Dev projs: ${devClientProjs.length}`);
      console.log(`==> Found Host projs: ${hostClientProjs.length}`);
      console.log(`==> Valid Project Names (Lower Trimmed):`, Array.from(clientProjectNames));
  }

  if (params.area && params.area.toLowerCase() !== 'todas' && params.area.toLowerCase() !== 'por cliente') {
    if (params.area.toLowerCase() === 'por ingeniero' && params.targetName) {
      query.developer = params.targetName;
    } else if (params.area.toLowerCase() !== 'por ingeniero') {
      const areaMap: { [key: string]: string } = {
        'ci/cd': 'CI/CD',
        'desarrollo': 'Desarrollo',
        'mkt': 'MKT',
        'hosting': 'Hosting'
      };
      const targetArea = areaMap[params.area.toLowerCase()] || params.area;
      query.area = targetArea;
    }
  }

  const cicdProjects = await mongodb.collection("CICD").find({}, { projection: { name: 1 } }).toArray();
  const mktProjects = await mongodb.collection("Marketing").find({}, { projection: { name: 1 } }).toArray();

  const cicdNames = new Set(cicdProjects.map(p => (p.name || '').toLowerCase().trim()));
  const mktNames = new Set(mktProjects.map(p => (p.name || '').toLowerCase().trim()));

  const horasDocs = await horasCollection.find(query).toArray();

  const statsMap: { [key: string]: any } = {};

  horasDocs.forEach((h: any) => {
    const projectNameLower = (h.projectName || '').toLowerCase().trim();

    if (params.area && params.area.toLowerCase() === 'por cliente') {
       if (!clientProjectNames.has(projectNameLower)) {
           return;
       }
    }

    const dev = h.developer || 'Sin nombre';
    let key = dev;
    let displayName = dev;

    if (params.area && params.area.toLowerCase() === 'por cliente') {
       if (!clientProjectNames.has(projectNameLower)) {
           return;
       }
       const rawProjectName = h.projectName || 'Sin Proyecto';
       key = `${rawProjectName}_${dev}`;
       displayName = `${rawProjectName} - ${dev}`;
    }

    if (!statsMap[key]) {
      statsMap[key] = { nombre: displayName, desarrollo: 0, cicd: 0, mkt: 0 };
    }

    const areaLower = (h.area || '').toLowerCase().trim();

    if (cicdNames.has(projectNameLower) || areaLower.includes('ci/cd') || areaLower.includes('cicd')) {
      statsMap[key].cicd += (h.hoursWorked || 0);
    } else if (mktNames.has(projectNameLower) || areaLower.includes('mkt') || areaLower.includes('marketing')) {
      statsMap[key].mkt += (h.hoursWorked || 0);
    } else if (areaLower.includes('desarrollo') || true) {
      statsMap[key].desarrollo += (h.hoursWorked || 0);
    }
  });

  if (params.area && params.area.toLowerCase() === 'por cliente') {
     console.log("==> calculateStats for por cliente finished");
     console.log("StatsMap keys: ", Object.keys(statsMap));
  }

  const rawLogs = horasDocs.filter((h: any) => {
    if (params.area && params.area.toLowerCase() === 'por cliente') {
       const pnLower = (h.projectName || '').toLowerCase().trim();
       if (!clientProjectNames.has(pnLower)) return false;
    }
    return true;
  }).map((h: any) => ({
    developer: h.developer || 'Sin nombre',
    projectName: h.projectName || 'Sin Proyecto',
    area: h.area || 'Desconocida',
    taskType: h.taskType || '',
    hoursWorked: h.hoursWorked || 0,
    date: h.date || null
  }));

  return {
    aggregates: Object.values(statsMap).map((s: any) => ({
      name: s.nombre,
      developmentHours: s.desarrollo,
      cicdHours: s.cicd,
      mktHours: s.mkt
    })),
    rawLogs
  };
}

export async function createReporte(reporte: ListaReportesDto) {
  const now = new Date();
  
  let start = reporte.startDate ? new Date(reporte.startDate) : undefined;
  let end = reporte.endDate ? new Date(reporte.endDate) : undefined;
  
  if (reporte.reportType === 'semanal') {
    start = new Date(now);
    start.setDate(now.getDate() - 7);
    end = now;
  } else if (reporte.reportType === 'mensual' || reporte.reportType === 'mensual por semana') {
    start = new Date(now);
    start.setMonth(now.getMonth() - 1);
    end = now;
  }

  try {
    const stats = await calculateStats({
      area: reporte.area,
      reportType: reporte.reportType,
      startDate: start,
      endDate: end,
      targetName: reporte.targetName,
      targetStatus: reporte.targetStatus
    });

    const reporteConTimestamps = {
      ...reporte,
      startDate: start,
      endDate: end,
      createdAt: now,
      updatedAt: now,
      stats: stats.aggregates,
      logs: stats.rawLogs,
      isDeleted: false,
    };
    const mongoResponse = await createReporteMongo(reporteConTimestamps);
    const reporteId = mongoResponse.insertedId.toString();


    return { ...reporteConTimestamps, _id: reporteId };
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "createReporte");
  }
}

export async function getReporteStats(id: string) {
  try {
    const reporte = await getReporteByIdMongo(id);
    if (!reporte) {
      throw new Error("Reporte no encontrado");
    }

    if (reporte.stats && reporte.stats.length > 0) {
      return { aggregates: reporte.stats, rawLogs: reporte.logs || [] };
    }

    return await calculateStats({
      area: reporte.area,
      reportType: reporte.reportType,
      startDate: reporte.startDate,
      endDate: reporte.endDate,
      targetName: reporte.targetName,
      targetStatus: reporte.targetStatus
    });
  } catch (error) {
    throw new BaseError("Inside catch: ", error, "getReporteStats");
  }
}


