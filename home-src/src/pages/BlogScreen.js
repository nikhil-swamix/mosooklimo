import React, { useEffect, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import styles from "../assets/css/Static.module.css";

const BlogScreen = () => {
  const [blogs, setBlogs] = useState();
  useEffect(() => {
    axios.get("/blogs").then((res) => {
      setBlogs(res.data);
      // console.log(res.data);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container className={styles.wrapper}>
      <div className="mt-5" style={{ display: "flex" }}>
        <LinkContainer role="button" to="/">
          <h6>Home</h6>
        </LinkContainer>
        <h6 className="text-muted">&nbsp;{`> Blog`}</h6>
      </div>
      {blogs &&
        blogs.map((data, index) => {
          return (
            <div key={index} className={styles.blogWrapper}>
              <Row>
                <h6 className="text-muted">{`Created At : ${
                  data.createdAt.split("T")[0]
                }`}</h6>
              </Row>
              <Row style={{ paddingBlock: "10px" }}>
                <p className="h1">{data.name}</p>
              </Row>
              <div className="mt-4">{data.description}</div>
              <span>
                <LinkContainer role="button" to={`/blogs/${data._id}`}>
                  <Button className="px-4 mt-4" variant="primary">
                    Read more
                  </Button>
                </LinkContainer>
              </span>
              <hr className="my-5" />
            </div>
          );
        })}
    </Container>
  );
};

export default BlogScreen;
