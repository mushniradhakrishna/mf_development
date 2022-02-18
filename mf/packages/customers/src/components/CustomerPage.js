import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import { useIndexedDB } from "react-indexed-db";
import { Offline, Online } from "react-detect-offline";

const CustomerPage = () => {
  const [online, setOnline] = useState(false);
  const [data, setData] = useState([]);
  const [persons, setPersons] = useState([]);
  const { add, getAll, clear } = useIndexedDB("people");
  const getData = () =>
    axios
      .get("http://localhost:8082/api/v1/customers/all", {
        headers: { "X-TENANT": "darden" },
      })
      .then((res) => {
        const fetchData = res.data.customers;
        //console.log(fetchData);
        setPersons(fetchData);
        clear().then(() => {
          if (fetchData.length > 0) {
            fetchData.forEach((item) => {
              add(item).then(
                (event) => {
                  console.log(
                    "ID Generated: ",
                    event.target.result ? event.target.result : ""
                  );
                },
                (error) => {
                  //console.log(error);
                }
              );
            });
          }
        });
      });

  useEffect(() => {
    setOnline(typeof navigator.onLine === "boolean" ? navigator.onLine : true);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
  }, []);

  useEffect(() => {
    if (online) {
      getData();
    } else {
      getAll().then((personsFromDB) => {
        let emptArr = [];
        for (var key in personsFromDB) {
          emptArr.push(personsFromDB[key]);
        }
        setPersons(emptArr);
      });
    }
  }, [online]);

  const goOnline = () => {
    console.log("online");
    setOnline(true);
  };

  const goOffline = () => {
    console.log("offline");
    setOnline(false);
  };

  return (
    <div className="table-wrap">
      <h1 className="table-header">
        Customer Details ({online ? "online..." : "offline..."})
      </h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Of Birth </th>
            <th>Contact Numner</th>
            <th>Email </th>
          </tr>
        </thead>
        {persons.map((e, index) => {
          return (
            <tbody>
              <tr>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.birthDate}</td>
                <td>{e.contactNumber}</td>
                <td>{e.email}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};

export default CustomerPage;
