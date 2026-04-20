import { useAnimatedNumber } from '../../hooks/useAnimatedNumber';
import { formatCurrency } from '../../utils/formatters';
import { useCurrency } from '../../context/CurrencyContext';

interface Props {
  value: number;
  className?: string;
}

export function AnimatedCurrency({ value, className = '' }: Props) {
  const animated = useAnimatedNumber(value);
  const { currency } = useCurrency();
  return <span className={className}>{formatCurrency(animated, currency)}</span>;
}
