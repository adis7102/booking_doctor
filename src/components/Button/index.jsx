import styleModule from '@/styles/components/Button.module.scss';

const Button = (props) => {
  const { children, onClick, variant, padding } = props;

  const styles = {
    backgroundColor: variant === 'primary' ? '#FF0068' : '#ff7979',
    borderRadius: '25px',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    padding
  }

  return (
    <div onClick={() => onClick()} className={styleModule.button} style={styles}>
      {children}
    </div>
  )
}

export default Button;