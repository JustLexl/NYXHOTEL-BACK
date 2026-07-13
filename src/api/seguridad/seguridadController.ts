import express, { NextFunction } from "express";
import * as service from "./seguridadService";
import { HttpStatusCode } from "../../shared/models/http.model";

// --- Alcoholimetro ---
export async function getAlcoholimetrosController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const list = await service.getAlcoholimetros();
    res.status(HttpStatusCode.OK).send(list);
  } catch (error) {
    next(error);
  }
}

export async function createAlcoholimetroController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const response = await service.createAlcoholimetro(req.body);
    res.status(HttpStatusCode.CREATED).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAlcoholimetroController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const response = await service.updateAlcoholimetro(id, req.body);
    res.status(HttpStatusCode.OK).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAlcoholimetroController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const id = req.params.id;
    await service.deleteAlcoholimetro(id);
    res.status(HttpStatusCode.OK).send({ message: "Registro de alcoholímetro eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}

// --- Accidente ---
export async function getAccidentesController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const list = await service.getAccidentes();
    res.status(HttpStatusCode.OK).send(list);
  } catch (error) {
    next(error);
  }
}

export async function createAccidenteController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const response = await service.createAccidente(req.body);
    res.status(HttpStatusCode.CREATED).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAccidenteController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const response = await service.updateAccidente(id, req.body);
    res.status(HttpStatusCode.OK).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAccidenteController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const id = req.params.id;
    await service.deleteAccidente(id);
    res.status(HttpStatusCode.OK).send({ message: "Registro de accidente eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}

// --- AccidenteColaborador ---
export async function getAccidenteColaboradoresController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const list = await service.getAccidenteColaboradores();
    res.status(HttpStatusCode.OK).send(list);
  } catch (error) {
    next(error);
  }
}

export async function createAccidenteColaboradorController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const response = await service.createAccidenteColaborador(req.body);
    res.status(HttpStatusCode.CREATED).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAccidenteColaboradorController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const response = await service.updateAccidenteColaborador(id, req.body);
    res.status(HttpStatusCode.OK).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAccidenteColaboradorController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const id = req.params.id;
    await service.deleteAccidenteColaborador(id);
    res.status(HttpStatusCode.OK).send({ message: "Registro de accidente de colaborador eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}

// --- Extravio ---
export async function getExtraviosController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const list = await service.getExtravios();
    res.status(HttpStatusCode.OK).send(list);
  } catch (error) {
    next(error);
  }
}

export async function createExtravioController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const response = await service.createExtravio(req.body);
    res.status(HttpStatusCode.CREATED).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export async function updateExtravioController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const response = await service.updateExtravio(id, req.body);
    res.status(HttpStatusCode.OK).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteExtravioController(req: express.Request, res: express.Response, next: NextFunction) {
  try {
    const id = req.params.id;
    await service.deleteExtravio(id);
    res.status(HttpStatusCode.OK).send({ message: "Registro de extravío eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}
