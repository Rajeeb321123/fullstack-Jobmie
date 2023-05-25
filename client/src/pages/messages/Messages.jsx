// MY Messages page

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

import moment from "moment";

import newRequest from "../../utils/newRequest";

import "./Messages.scss";
import Cookies from "js-cookie";

const Messages = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // look at Reviews.jsx for useQueryClient description or look at tanstack react-query doc
  const queryClient = useQueryClient();
  const accessToken = Cookies.get("accessToken");

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest(accessToken).get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  // // look at Reviews.jsx for useMutation description or look at  tanstack react-query doc
  const mutation = useMutation({
    // id is like parameter of funcion
    mutationFn: (id) => {
      
      return newRequest(accessToken).put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tbody>

            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((c) => (
              <tr
              className={
                ((currentUser.isSeller && !c.readBySeller) ||
                (!currentUser.isSeller && !c.readByBuyer)) ?
                "active":undefined
                }
                key={c.id}
              >
                <td><Link to={`/message/${c.id}`} className="link">{currentUser.isSeller ? c.buyerId : c.sellerId}</Link></td>
                <td>

                  {/* id is custom id we created (not _id ) */}
                  <Link to={`/message/${c.id}`} className="link">
                    {c?.lastMessage?.substring(0, 200)}...
                  </Link>
                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
                  {((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) && (
                    <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;