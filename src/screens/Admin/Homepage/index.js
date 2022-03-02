import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams, withRouter } from "react-router-dom";

import {
  getAllPostsAction,
  getAllPostsByDomaineAction,
  getAllPostsByDomaineReset,
  getAllPostsReset,
} from "../../../redux/api/PostsApi";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Loader from "../../../components/Loader";
import { Input } from "../../../components/Input";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { Constant } from "../../../config/Constant";
import * as moment from "moment";
import { toast } from "react-toastify";
import * as Utils from "../../../utils";
import $ from "jquery";

let route = require("../../../utils/route");

function HomePage() {
  const { t } = useTranslation();
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();

  const RenderModalUpdateStats = () => (
    <div
      className="modal fade"
      id="updateStatEmployeesModal"
      data-backdrop="static"
      data-keyboard="false"
      tabIndex="-1"
      aria-labelledby="addFaqModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addFaqModalLabel">
              Statistiques Employées
            </h5>
            <button type="button" className="close" data-dismiss="modal">
              <span className="sr-only">{t("common.click_to_close")}</span>
            </button>
          </div>
          <div className="modal-body"></div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              {t("common.close")}
            </button>
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              <span className="sr-only">{t("common.loading")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid">
        <Helmet>
          <title>{`${t("app.name")} - ${t("admin.homepage")}`}</title>
        </Helmet>

        <h1>{t("admin.homepage")}</h1>

        <div className="row">
          <div className="col-xl-6 col-lg-4">
            <div class="bg-white border rounded-sm w-100 d-flex py-3 px-3 br-4">
              <form className="py-3 relative position-relative">
                <h2 className="title-underlined mb-4">
                  Statistiques personnel
                </h2>
                <div className="row">
                  <div className="col-12">
                    <div class="mb-3">
                      <label for="maleEmployeeInput" class="form-label">
                        {" "}
                        {t("common.nombre_homme")}{" "}
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="maleEmployeeInput"
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div class="mb-3">
                      <label for="femaleEmployeeInput" class="form-label">
                        {" "}
                        {t("common.nombre_femme")}{" "}
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="femaleEmployeeInput"
                        min={0}
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  {t("common.save")}
                </button>
              </form>
            </div>
          </div>
        </div>

        <form className="py-3 relative position-relative">
          <h2 className="title-underlined mb-4">Top E-learners</h2>
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-9">
                  <div class="d-flex mb-3">
                    <label for="maleEmployeeInput">
                      Ajouter Best E-learners Name
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="maleEmployeeInput"
                      min={0}
                    />
                  </div>
                </div>
                <div className="col-3">
                  <button className="btn btn-primary">
                    {t("common.save")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default HomePage;
