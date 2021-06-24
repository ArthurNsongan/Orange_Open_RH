import React from 'react';
import './style.css';

export default function SocialShare(props) {

    return (
        <div className="social-share-btn">
            <a className="btn btn-social btn-twitter" href="#"><span className="sr-only">Twitter</span></a>
            <a className="btn btn-social btn-facebook" href="#"><span className="sr-only">Facebook</span></a>
            <a className="btn btn-social btn-instagram" href="#"><span className="sr-only">Instagram</span></a>
            <a className="btn btn-social btn-whatsapp" href="#"><span className="sr-only">Whatsapp</span></a>
            <a className="btn btn-social btn-linkedin" href="#"><span className="sr-only">Linkedin</span></a>
            <a className="btn btn-social btn-youtube" href="#"><span className="sr-only">YouTube</span></a>
            <a className="btn btn-social btn-mail" href="#"><span className="sr-only">Mail</span></a>
        </div>
    );
}
