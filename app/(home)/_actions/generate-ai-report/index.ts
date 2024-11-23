"use server";
import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month });
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";
  if (!hasPremiumPlan) {
    throw new Error(
      "Você precisa ter um plano Premium para gerar um relatório IA",
    );
  }
  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // pegar as transações do mês recebido
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`2024-${month}-01`),
        lt: new Date(`2024-${month}-31`),
      },
    },
  });

  // mandar as transações para o ChatGPT e pedir para ele gerar um relatório com a visão
  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar
     minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uam é {DATA}-{TIPO}
     -{VALOR}-{CATEGORIA}. São elas: 
    ${transactions
      .map(
        (transaction) =>
          `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
      )
      .join(";")}`;
  const completion = await openAi.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizar melhor as finanças.",
      },
      {
        role: "user",
        content,
      },
    ],
  });
  // pegar o relatório gerado e retornar ao usuário
  return completion.choices[0].message.content;
};
