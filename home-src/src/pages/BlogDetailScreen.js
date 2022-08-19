import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import styles from "../assets/css/Static.module.css";

const BlogDetailScreen = ({ match }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    axios.get("/blogs").then((res) => {
      setBlog(res.data);
      setLoading(true);
    });
  }, []);

  var blogMatch = [];
  if (loading) {
    blogMatch = blog.filter((d) => d._id === id);
    // console.log(blogMatch);
  }

  return (
    <Container className={styles.wrapper}>
      {loading && (
        <div style={{ marginTop: "100px" }}>
          <div className="mt-5" style={{ display: "flex" }}>
            <LinkContainer role="button" to="/">
              <h6>Home</h6>
            </LinkContainer>
            <LinkContainer role="button" to="/blogs.php">
              <h6>&nbsp;{`> Blogs`}</h6>
            </LinkContainer>
            <h6 className={`text-muted ${styles.blogTitle}`}>
              &nbsp;{`> ${blogMatch[0].name}`}
            </h6>
          </div>

          <div className={styles.blogDetailWrapper}>
            <Row style={{ marginTop: "20px" }}>
              <h6 className="text-muted">{`Created At : ${
                blogMatch[0].createdAt.split("T")[0]
              }`}</h6>
            </Row>
            <Row style={{ marginBlock: "15px" }}>
              <p className="h1">{blogMatch[0].name}</p>
            </Row>
            <div className="mt-4">{blogMatch[0].description}</div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default BlogDetailScreen;
