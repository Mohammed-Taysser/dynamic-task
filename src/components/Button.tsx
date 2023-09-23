import {
  Box,
  ButtonProps,
  CircularProgress,
  Button as MUIButton,
} from '@mui/material';

function Button(props: CustomButtonProps & ButtonProps) {
  const { isLoading, children, ...reset } = props;

  return (
    <Box sx={{ position: 'relative' }}>
      <MUIButton variant='contained' disabled={isLoading} {...reset}>
        {children}
      </MUIButton>

      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  );
}

Button.defaultProps = {
  children: 'Submit',
  isLoading: false,
};

export default Button;
