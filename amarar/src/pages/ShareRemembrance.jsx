import React, { useRef } from 'react';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share';

import '../styles/ShareRemembrance.css';

function ShareRemembrance ( props )
{
    const currentPath = window.location.href;
    const clipboardref = useRef( null );

    return ( props.trigger ) ? (
        <div className='popup'>
            <div className='popup_inner'>
                <button
                    className='close_btn btn-sm'
                    onClick={ () => props.setTrigger( false ) }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#326346" class="bi bi-x-square-fill">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                    </svg>
                </button>

                {/* Social media buttons*/ }
                <div className='popup-icon-container'>
                    <div className='popup-icon-container-inner'>
                        <div className='popup-icon'>
                            <FacebookShareButton
                                title="Check out this Obituary"
                                url={ currentPath }
                            >
                                <FacebookIcon size={ 50 } round={ true } />
                            </FacebookShareButton>
                        </div>

                        <div className='popup-icon'>
                            <TwitterShareButton
                                title="Check out this Obituary"
                                url={ currentPath }
                            >
                                <TwitterIcon size={ 50 } round={ true } />
                            </TwitterShareButton>
                        </div>

                        <div className='popup-icon'>
                            <EmailShareButton
                                title="Check out this Obituary"
                                url={ currentPath }
                            >
                                <EmailIcon size={ 50 } round={ true } />
                            </EmailShareButton>
                        </div>
                    </div>

                    {/* 
                <div className='popup-icon'>
                <button
                    ref={ clipboardRef }
                    data-clipboard-text={ currentPath }
                >
                    Copy Link
                </button> 
                </div>*/}
                    { props.children }
                </div>
            </div>
        </div>
    ) : "";
}

export default ShareRemembrance