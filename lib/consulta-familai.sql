SELECT
  f."nomeFamilia" AS "Nome da Família",
  CONCAT(
    CASE WHEN NOT EXISTS (
      SELECT 1 FROM perfil AS p2
      JOIN familia AS f2 ON p2."familiaID" = f2.id
      WHERE f2."nomeFamilia" = f."nomeFamilia" AND p2.id < p.id
    ) THEN '*' ELSE '' END,
    p.nome
  ) AS "Nome do Participante",
  p.relacao AS "Relação na Família"
FROM perfil AS p
JOIN familia AS f ON p."familiaID" = f.id
ORDER BY f."nomeFamilia", p.relacao;

