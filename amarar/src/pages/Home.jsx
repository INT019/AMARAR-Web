import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import
{
    Container,
    CssBaseline,
    Divider,
    Grid,
    ThemeProvider,
    Typography,
    createTheme
} from '@mui/material';
import HomeImage from './HomeImage';
import homeImage from '../images/homeimage.png';
import service1 from '../images/service1.png';
import service2 from '../images/service2.png';
import service3 from '../images/service3.png';
import ServiseCard from './ServiseCard';

function Home ()
{
    const mainHomeImage = {
        title: 'Amarar',
        description: 'Missing you is the heartache that never goes away.',
        image: homeImage,
        imageText: 'home image'
    };

    const serviceCard = [
        {
            image: service1,
            title: 'Create Obituary',
            description: 'Create personalized obituaries for your loved ones with our dedicated obituary service available on our company website.'
        },

        {
            image: service2,
            title: 'Donation Service',
            description: 'Extend your support to those in need by making donations through our dedicated service on the company website.'
        },

        {
            image: service3,
            title: 'Remembrances',
            description: 'Celebrate the memory of your loved ones by creating personalized tributes on our company website.'
        },
    ]

    const defaultTheme = createTheme();

    return (
        <div className='home-container'>
            <div className='header'>
                <Header />
            </div>

            <ThemeProvider theme={ defaultTheme }>
                <Container maxWidth={ 'xl' }>
                    <main>
                        <HomeImage homeImage={ mainHomeImage } />

                        <Typography
                            component="h2"
                            variant='h3'
                            color='#326346'
                            marginBottom={ '20px' }
                            fontFamily={ 'manuale' }
                            textAlign={ 'center' }
                            fontWeight={ '500' }
                            gutterBottom
                        >Obituary</Typography>

                        <Divider
                            variant='middle'
                            color='#454B4E8a'
                        />

                        <Typography
                            component="h2"
                            variant='h3'
                            color='#326346'
                            marginBottom={ '20px' }
                            fontFamily={ 'manuale' }
                            textAlign={ 'center' }
                            fontWeight={ '500' }
                            gutterBottom
                        >Remembrance</Typography>

                        <Divider
                            variant='middle'
                            color='#454B4E8a'
                        />

                        <Typography
                            component="h2"
                            variant='h3'
                            color='#326346'
                            marginBottom={ '20px' }
                            fontFamily={ 'manuale' }
                            textAlign={ 'center' }
                            fontWeight={ '500' }
                            gutterBottom
                        >Our Services</Typography>

                        <Grid
                            container
                            alignItems={ 'center' }
                            justifyContent={ 'center' }
                        >
                            { serviceCard.map( ( service ) => (
                                <Grid
                                    item
                                    xs={ 2 }
                                    sm={ 4 }
                                    md={ 4 }
                                    key={ service.title }
                                >
                                    <ServiseCard services={ service } />
                                </Grid>
                            ) ) }
                        </Grid>
                    </main>
                </Container>
            </ThemeProvider>

            <div className='footer'>
                <Footer />
            </div>
        </div>
    );
}

export default Home;