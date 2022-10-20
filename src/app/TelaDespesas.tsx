import { useEffect, useState } from 'react';
import { carregaDespesas, IDespesa } from './backend';
import TabelaDespessas from './TabelaDespesas';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { formataValor } from './util';
import { useHistory, useParams } from 'react-router-dom';
import SelecaoAnoMes from './SelecaoAnoMes';

export default function TelaDespesa() {
  const { anoMes } = useParams<{ anoMes: string }>();
  const history = useHistory();
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
    history.push(`/despesas/${novoAnoMes}`);
  }
}

function calculaTotal(despesas: IDespesa[]) {
  let total = 0;
  for (const despesa of despesas) {
    total += despesa.valor;
  }
  return total;
}
