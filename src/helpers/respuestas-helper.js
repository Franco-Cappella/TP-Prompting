//IAAAA
import { StatusCodes } from 'http-status-codes';

class RespuestasHelper {

    responderOk = (res, data) => {
        res.status(StatusCodes.OK).json(data);
    }

    responderCreated = (res, data) => {
        res.status(StatusCodes.CREATED).json(data);
    }

    responderNotFound = (res, id) => {
        res.status(StatusCodes.NOT_FOUND).send(`No se encontro la entidad (id:${id}).`);
    }

    responderInternalServerError = (res, message) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(message);
    }

    responderBadRequest = (res, data) => {
        res.status(StatusCodes.BAD_REQUEST).json(data);
    }

    responderError = (res, error, statusCode) => {
        console.log(error);
        res.status(statusCode).send(`Error: ${error.message}`);
    }
}

export default new RespuestasHelper();
