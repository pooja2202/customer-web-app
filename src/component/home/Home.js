import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCustomer } from "../../context/CustomerContext";
import { useNavigate } from "react-router-dom";
import { isTimeApproaching, splitDateTime } from "../../utils/utils";

const Home = () => {
  return (
    <>
      <h1>HOME PAGE</h1>
    </>
  );
};

export default Home;
