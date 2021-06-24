import React from 'react';

export default function Footer(props) {

    return (
        <footer className="o-footer" role="contentinfo">
            <h2 className="sr-only">Site map & informations</h2>
            <div className="o-footer-top">
                <div className="container-md">
                    <ul className="nav align-items-center">
                        <li className="nav-item mb-3 mb-md-0 pl-md-0 col-12 col-md-auto">Follow us</li>
                        <li className="nav-item ml-2"><a className="nav-link btn btn-inverse btn-social btn-twitter"
                                                         href="#"><span className="sr-only">Twitter</span></a></li>
                        <li className="nav-item ml-2"><a className="nav-link btn btn-inverse btn-social btn-facebook"
                                                         href="#"><span className="sr-only">Facebook</span></a></li>
                        <li className="nav-item ml-2"><a className="nav-link btn btn-inverse btn-social btn-instagram"
                                                         href="#"><span className="sr-only">Instagram</span></a></li>
                        <li className="nav-item ml-2"><a className="nav-link btn btn-inverse btn-social btn-linkedin"
                                                         href="#"><span className="sr-only">Linkedin</span></a></li>
                        <li className="nav-item ml-2"><a className="nav-link btn btn-inverse btn-social btn-youtube"
                                                         href="#"><span className="sr-only">YouTube</span></a></li>
                        <li className="nav-item ml-2"><a className="nav-link btn btn-inverse btn-social btn-mail"
                                                         href="#"><span className="sr-only">Mail</span></a></li>
                    </ul>
                </div>
            </div>
            <div className="o-footer-body">
                <div className="container-md">
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <h3>Discover</h3>
                            <ul className="nav flex-column">
                                <li className="nav-item"><a className="nav-link" href="#">Unde omnis istea</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Natus error sit</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Voluptatem</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Totam rem aperiam</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h3>Shop</h3>
                            <ul className="nav flex-column">
                                <li className="nav-item"><a className="nav-link" href="#">Natus error sit</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Unde omnis istea</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Voluptatem</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Doloremque</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Totam rem aperiam</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h3>Services</h3>
                            <ul className="nav flex-column">
                                <li className="nav-item"><a className="nav-link" href="#">Doloremque</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Totam rem aperiam</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h3>Support</h3>
                            <ul className="nav flex-column">
                                <li className="nav-item"><a className="nav-link" href="#">Doloremque</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Unde omnis istea</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Voluptatem</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Totam rem aperiam</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="o-footer-bottom">
                <div className="container-md">
                    <ul className="nav flex-column flex-md-row">
                        <li className="nav-item my-1 my-md-0">
                            <a className="nav-link" href="#">
                                <span aria-hidden="true" className="icon-location-pin-compass"></span>
                                Store locator
                            </a>
                        </li>
                        <li className="nav-item my-1 my-md-0">
                            <a className="nav-link" href="#">
                                <span aria-hidden="true" className="icon-mobile-network-coverage"></span>
                                Coverage checker
                            </a>
                        </li>
                        <li className="nav-item my-1 my-md-0">
                            <a className="nav-link" href="#">
                                <span aria-hidden="true" className="icon-Colour-Call"></span>
                                Contact us
                            </a>
                        </li>
                        <li className="nav-item my-1 my-md-0">
                            <a className="nav-link" href="#">
                                <span aria-hidden="true" className="icon-child-protection"></span>
                                Child protection
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="o-footer-bottom">
                <div className="container-md">
                    <ul className="nav flex-column flex-md-row">
                        <li className="nav-item mb-2 mt-1 mr-3 my-md-0 align-self-md-center">© Orange 2020</li>
                        <li className="nav-item mb-2 mt-1 my-md-0"><a className="nav-link" href="#">Jobs</a></li>
                        <li className="nav-item mb-2 mt-1 my-md-0"><a className="nav-link" href="#">Advertise</a></li>
                        <li className="nav-item mb-2 mt-1 my-md-0"><a className="nav-link" href="#">Terms &
                            Conditions</a></li>
                        <li className="nav-item mb-2 mt-1 my-md-0"><a className="nav-link" href="#">Privacy</a></li>
                        <li className="nav-item mb-2 mt-1 my-md-0"><a className="nav-link" href="#">Cookies</a></li>
                        <li className="nav-item mb-2 mt-1 my-md-0"><a className="nav-link" href="#">Access for all</a>
                        </li>
                        <li className="nav-item mb-2 mt-1 my-md-0"><a className="nav-link" href="#">Safety online</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}