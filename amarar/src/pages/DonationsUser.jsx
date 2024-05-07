import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/donation.css';
import rightArrow from '../images/right-arrow.png';
import leftArrow from '../images/left-arrow.png';
import { formatDistanceToNow } from 'date-fns';

export default function DonationUser() {
  const [donation, setDonation] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8081/viewdonation")
      .then((res) => setDonation(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === donation.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? donation.length - 1 : prevIndex - 1));
  };

  const formatTimeAgo = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <div className='obituary-post-section'>
      <div className='view-donation-title'>
        <h2 className='headlink'>
          If you need to add a donation{' '}
          <a
            href='/donations'
            style={{
              fontStyle: 'italic',
              fontWeight: 'bold',
              color: '#326346',
              fontFamily: 'Manuale',
              textDecoration: 'none',
            }}
          >
            Click Here
          </a>
        </h2>
      </div>
      <div className='view-donnation-hr'>
        <hr className='donation-hr'></hr>
      </div>
      <div className='view-donation-sliding-content'>
        <div className='sliding-arrow' onClick={handlePrev}>
          <img className='leftArrow' src={leftArrow} alt='left arrow' />
        </div>
        <div className='view-donation-frame'>
          {donation.map((data, index) => (
            <div
              key={index}
              className={`donation-frame ${index === currentIndex ? 'active' : ''}`}
              style={{ display: index === currentIndex ? 'block' : 'none', width: '600px', height: '340px' }}
            >
              <p>{data.Comment}</p>
              <div className='h6'>
                <h6>{data.Username}</h6>
                <h6>{formatTimeAgo(data.Date)}</h6>
              </div>
            </div>
          ))}
        </div>
        <div className='sliding-arrow' onClick={handleNext}>
          <img className='rightArrow' src={rightArrow} alt='right arrow' />
        </div>
      </div>
    </div>
  );
}
