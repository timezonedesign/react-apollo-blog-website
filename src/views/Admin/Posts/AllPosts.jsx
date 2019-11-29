import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
// import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Checkbox from "@material-ui/core/Checkbox";

import { dataTable } from "variables/general.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { GET_POSTS, DELETE_POST } from "queries";
import { Query, Mutation } from 'react-apollo';

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class AllPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.getPosts = this.getPosts.bind(this);
  }
  componentDidMount(){
    // this.getPosts();
    console.log("didmount");
  }
  getPosts() {
    console.log("getposts");
    return(    
    <Query query={GET_POSTS}>
      {({ loading, data, error }) => {
        console.log(data);
        if (loading) return 
        if (error) return 
        if (data.posts.length == 0) return 
        if (this.state.data.length > 0) return
    this.setState({
      data: data.posts.map(post => {
        let key = post._id;
        return {
          id: key,
          checkbox: <Checkbox />,
          name: post.title,
          position: post._id,
          office: "",
          age: "",
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Link to={`edit/${post._id}`}>
              <Button
                justIcon
                round
                simple
                // onClick={() => {
                //   let obj = this.state.data.find(o => o.id === key);
                //   alert(
                //     "You've clicked EDIT button on \n{ \n_id: " +
                //       obj.id 
                //   );
                // }}
                color="warning"
                className="edit"
              >
                  <Dvr />
              </Button>
                </Link>
               {" "}
              {/* use this button to remove the data row */}
          <Mutation mutation={ DELETE_POST } 
          variables={{ _id: key }}
          >
            {(deletePost, {loading}) => {
            return (
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  deletePost().then(async () => {
                    console.log('We have deleted your post!', 'Deleted!');
                    // this.clearState();
                  }).catch(() => {
                    console.log("error!");
                  });
                }}
                color="danger"
                className="remove"
              >
                <Close />
              </Button>
            )
              }}
              </Mutation>
              {" "}
            </div>
          )
        };
      })
    });
  }}
  </Query>
  );
  }

  render() {
    const { classes } = this.props;
    // this.getPosts();
    return (
      <Query query={GET_POSTS}>
      {({ loading, data }) => {
        // if (loading) return <div></div>
        // if (error) return <div></div>
        if (!loading) {
          console.log(this.state.data.length == 0);
        if (data.posts.length > 0 && this.state.data.length == 0) {
          this.setState({
            data: data.posts.map(post => {
              let key = post._id;
              return {
                id: key,
                checkbox: <Checkbox />,
                name: post.title,
                position: post._id,
                office: "",
                age: "",
                actions: (
                  // we've added some custom button actions
                  <div className="actions-right">
                    {/* use this button to add a edit kind of action */}
                    <Link to={`edit/${post._id}`}>
                    <Button
                      justIcon
                      round
                      simple
                      // onClick={() => {
                      //   let obj = this.state.data.find(o => o.id === key);
                      //   alert(
                      //     "You've clicked EDIT button on \n{ \n_id: " +
                      //       obj.id 
                      //   );
                      // }}
                      color="warning"
                      className="edit"
                    >
                        <Dvr />
                    </Button>
                      </Link>
                    {" "}
                    {/* use this button to remove the data row */}
                <Mutation mutation={ DELETE_POST } 
                variables={{ _id: key }}
                >
                  {(deletePost, {loading}) => {
                  return (
                    <Button
                      justIcon
                      round
                      simple
                      onClick={() => {
                        deletePost().then(async () => {
                          console.log('We have deleted your post!', 'Deleted!');
                          var data = this.state.data;
                          data.find((o, i) => {
                            if (o.id === key) {
                              // here you should add some custom code so you can delete the data
                              // from this component and from your server as well
                              data.splice(i, 1);
                            }
                          });
                          this.setState({ data: data });
                        }).catch(() => {
                          console.log("error!");
                        });
                      }}
                      color="danger"
                      className="remove"
                    >
                      <Close />
                    </Button>
                  )
                    }}
                    </Mutation>
                    {" "}
                  </div>
                )
              };
            })
          });
        }}
        return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>React Table</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={this.state.data}
                filterable
                columns={[
                  {
                    Header: <Checkbox/>,
                    accessor: "checkbox",
                    sortable: false,
                    filterable: false
                  },
                  {
                    Header: "Title",
                    accessor: "name"
                  },
                  {
                    Header: "Author",
                    accessor: "position"
                  },
                  {
                    Header: "Categories",
                    accessor: "office"
                  },
                  {
                    Header: "Tags",
                    accessor: "age"
                  },
                  {
                    Header: "Comments Count",
                    accessor: "age"
                  },
                  {
                    Header: "Date",
                    accessor: "age"
                  },
                  {
                    Header: "Actions",
                    accessor: "actions",
                    sortable: false,
                    filterable: false
                  }
                ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
        );
      }}
      </Query>
    );
  }
}

export default withStyles(styles)(AllPosts);
