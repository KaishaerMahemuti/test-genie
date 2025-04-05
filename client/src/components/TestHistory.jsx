import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";

const TestHistory = ({ user }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchTests = async () => {
      const q = query(
        collection(db, "testGenerations"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistory(results);
    };

    fetchTests();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this test?")) return;

    try {
      await deleteDoc(doc(db, "testGenerations", id));
      setHistory(history.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="mt-5">
      <h4>Your Test History</h4>
      {history.length === 0 ? (
        <p className="text-muted">No saved tests yet.</p>
      ) : (
        history.map((item, index) => (
          <div className="card mb-3" key={item.id}>
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">
                {item.language.toUpperCase()} • {item.framework} •{" "}
                {item.createdAt?.toDate().toLocaleString()}
              </h6>
              <pre className="bg-light p-2 mb-2">
                <code>{item.code}</code>
              </pre>
              <h6>Generated Tests:</h6>
              <pre className="bg-light p-2">
                <code>{item.testCode}</code>
              </pre>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(item.id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TestHistory;
