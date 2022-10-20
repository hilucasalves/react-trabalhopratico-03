import { useEffect, useState } from 'react';
import { carregaDespesas, IDespesa } from './backend';
import TabelaDespessas from './TabelaDespesas';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { formataValor } from './util';
import { useNavigate, useParams } from 'react-router-dom';
import SelecaoAnoMes from './SelecaoAnoMes';

export default function TelaDespesa() {
  const params = useParams<{ anoMes: string }>();
  const anoMes = params.anoMes || '2021-06';
  const navigate = useNavigate();
  const [despesas, setDespesas] = useState<IDespesa[]>([]);

  useEffect(() => {
    carregaDespesas(anoMes).then(setDespesas);
  }, [anoMes]);

  const valorTotal = calculaTotal(despesas);

  return (
    <Container>
      <Box display="flex" padding="16px">
        <Box flex="1">
          <SelecaoAnoMes anoMes={anoMes} onchangeAnoMes={onChangeAnoMes} />
        </Box>
        <Box>
          <span>
            Despesa Total: <strong>R$ {formataValor(valorTotal)}</strong>
          </span>
        </Box>
      </Box>
      <TabelaDespessas despesas={despesas} />
    </Container>
  );

  function onChangeAnoMes(novoAnoMes: string) {
    navigate(`/despesas/${novoAnoMes}`);
  }
}

function calculaTotal(despesas: IDespesa[]) {
  let total = 0;
  for (const despesa of despesas) {
    total += despesa.valor;
  }
  return total;
}
