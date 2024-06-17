SELECT
  f."nomeFamilia" AS "Nome da Família",
  p.nome AS "Nome do Participante",
  p.relacao AS "Relação na Família"
FROM perfil AS p
JOIN familia AS f ON p."familiaID" = f.id  
ORDER BY f."nomeFamilia", p.relacao;
