import
{
    Box,
    Grid,
    Paper,
    Typography
} from '@mui/material';
import React from 'react'
import PropTypes from 'prop-types';

function HomeImage ( props )
{

    const { homeImage } = props;

    return (
        <Paper
            sx={ {
                position: 'relative',
                margin: '0',
                marginTop: '10px',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${ homeImage.image })`,
            } }
        >
            {
                <img
                    style={ { display: 'none' } }
                    src={ homeImage.image }
                    alt={ homeImage.imageText }
                />
            }

            <Box
                sx={ {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                } }
            />

            <Grid container>
                <Grid item md={ 6 }>
                    <Box
                        sx={ {
                            position: 'relative',
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        } }
                    >
                        <Typography
                            component="h1"
                            variant='h3'
                            color='#FFFFFF'
                            marginLeft={ '150px' }
                            fontFamily={ 'manuale' }
                            gutterBottom
                        >
                            { homeImage.title }
                        </Typography>

                        <Typography
                            component="h4"
                            color='#FFFFFF'
                            backgroundColor='#3263467a'
                            padding={ '10px' }
                            borderRadius={ '10px' }
                            textAlign={ 'center' }
                            width={ '500px' }
                            fontFamily={ 'manuale' }
                            paragraph
                        >
                            { homeImage.description }
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

HomeImage.propTypes = {
    homeImage: PropTypes.shape( {
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        imageText: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    } ).isRequired,
};

export default HomeImage