import { ZodError } from "zod";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { emailQueue, emailQueueName } from "./jobs/EmailJob.js";

export const formatError = (error: ZodError): any => {
  let errors: any = {};
  error.errors?.map((issue) => {
    errors[issue?.path[0]] = issue.message;
  });

  return errors;
};

export const renderEmailEjs = async (
  fileName: string,
  payload: any
): Promise<string> => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const html: string = await ejs.renderFile(
    __dirname + `/views/emails/${fileName}.ejs`,
    payload
  );

  //   await sendEmail("satebic297@deusa7.com", "Test Email", html);
  await emailQueue.add(emailQueueName, {
    to: "satebic297@deusa7.com",
    subject: "Testing",
    body: html,
  });
  return html;
};
