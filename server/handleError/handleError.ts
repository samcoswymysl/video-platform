import {NextFunction, Request, Response} from "express";

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const answer = {
    message: 'Sorry try later',
    status: 500,
  };

    answer.message = err.message;
    answer.status = 401;

  // if (err instanceof WrongDataError) {
  //   answer.message = err.message;
  //   answer.status = 404;
  // }
  console.log(err);
  console.log(answer)
  res
    .status(answer.status)
    .json(answer.message);
};

