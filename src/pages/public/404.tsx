import { Box, Button, Grid, Typography } from '@mui/material';
import { VscArrowSmallLeft } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import PageNotFoundImage from '../../assets/images/background/404.svg';
import usePageTitle from '../../hooks/usePageTitle';

function PageNotFound() {
  usePageTitle('404');

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      sx={{ minHeight: '100vh' }}
    >
      <Grid item md={6}>
        <Box textAlign='center'>
          <img
            src={PageNotFoundImage}
            alt='404 page'
            className='img-fluid'
            width={400}
          />

          <Typography
            mt={3}
            variant='h6'
            fontWeight='bolder'
            textTransform='capitalize'
          >
            Oops… You just found an error page
          </Typography>

          <Typography
            my={2}
            variant='subtitle1'
            fontWeight='lighter'
            textTransform='capitalize'
          >
            We are sorry but the page you are looking for was not found
          </Typography>

          <Button
            component={Link}
            to='/'
            variant='contained'
            startIcon={<VscArrowSmallLeft />}
          >
            Take me home
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PageNotFound;
