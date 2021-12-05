import style from './styles.module.scss';

type TooltipProps = {
  title: string;
  className?: string;
  children: React.ReactNode
}

const Tooltip = ({ title, children, className}: TooltipProps) => (
  <div className={`${style.container} ${className}`}>
    {children}
    <span>{title}</span>
  </div>
);

export default Tooltip;
