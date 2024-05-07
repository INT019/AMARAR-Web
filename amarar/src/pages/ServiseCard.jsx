import
{
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography
} from '@mui/material';
import React from 'react'
import PropTypes from 'prop-types';

function ServiseCard ( props )
{
    const { services } = props;

    return (
        <Grid
            sx={ { flexGrow: 1 } }
            container
        >
            <Grid
                item
                xs={ 12 }
            >
                <Grid
                    container
                    justifyContent={ 'center' }
                    alignItems={ 'center' }
                    spacing={ 2 }
                >
                    <Card sx={ {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: '15px',
                        width: '300px',
                        marginTop: '20px',
                        marginBottom: '50px',
                        height: '400px',
                        borderRadius: '10px',
                        borderColor: 'black'
                    } }>
                        <CardMedia
                            component="img"
                            sx={ {
                                padding: '10px',
                                alignItems: 'center',
                                width: '160px',
                                height: '160px',
                                display: {
                                    xs: 'none',
                                    sm: 'block'
                                }
                            } }
                            image={ services.image }
                            alt='services'
                        ></CardMedia>

                        <CardContent sx={ { flex: 1 } }>
                            <Typography
                                gutterBottom
                                component={ 'h2' }
                                variant='h5'
                                fontFamily={ 'manuale' }
                                fontWeight={ 600 }
                            >
                                { services.title }
                            </Typography>

                            <Typography
                                variant='body2'
                                padding={ '10px' }
                                fontFamily={ 'manuale' }
                                fontWeight={ 400 }
                            >
                                { services.description }
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

ServiseCard.propTypes = {
    services: PropTypes.shape( {
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    } ).isRequired,
};

export default ServiseCard