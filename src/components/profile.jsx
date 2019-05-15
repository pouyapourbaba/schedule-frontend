import React, { Component } from "react";
import _ from "lodash"
import Joi from "joi-browser";
import ContentEditable from "react-contenteditable";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  Input
} from "reactstrap";

class Profile extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const first_name = e.target.elements.first_name.value;
    const last_name = e.target.elements.last_name.vlaue;
    const email = e.target.elements.email.value;

    const user = {}
    if (first_name) user.first_name = first_name
    if (last_name) user.last_name = last_name
    if (email) user.email = email

    if(_.isEmpty(user)) return;

    this.props.updateUser(this.props.user._id, user)
  };

  render() {
    // get user from the props
    const { first_name, last_name, email, added_date } = this.props.user;

    // format the date
    const rawDate = new Date(added_date);
    const formattedDate = rawDate.toDateString();

    return (
      <React.Fragment>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1>Profile</h1>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for="first_name" sm={2} size="lg">
              First Name
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="first_name"
                id="first_name"
                placeholder={first_name}
                bsSize="lg"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="last_name" sm={2} size="lg">
              Last Name
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="last_name"
                id="last_name"
                placeholder={last_name}
                bsSize="lg"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={2} size="lg">
              Email
            </Label>
            <Col sm={10}>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder={email}
                bsSize="lg"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="added_date" sm={2} size="lg">
              Joined Date
            </Label>
            <Col sm={10}>
              <Input
                type="added_date"
                name="added_date"
                id="added_date"
                placeholder={formattedDate}
                bsSize="lg"
                disabled={true}
              />
            </Col>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </React.Fragment>
    );
  }
}

// class Profile extends FormPouya {
//   state = {
//     user: { first_name: "", last_name: "", email: "" },
//     errors: {}
//   };

//   schema = {
//     first_name: Joi.string()
//       .min(4)
//       .max(255)
//       .required(),
//     last_name: Joi.string()
//       .min(4)
//       .max(255)
//       .required(),
//     email: Joi.string()
//       .min(6)
//       .max(255)
//       .required()
//       .email()
//   };

//   // validate each field when its value changes
//   validateProperty = (name, value) => {
//     const obj = { [name]: value };
//     const schema = { [name]: this.schema[name] };
//     const { error } = Joi.validate(obj, schema);

//     return error ? error.details[0].message : null;
//   };

//   async componentDidMount() {
//     if (this.props.match.params.user_id === undefined) return;
//     console.log("this.props.match.params ", this.props.match.params.user_id);

//     try {
//       let user = await userService.getUser(this.props.match.params.user_id);
//       user = user.data;
//       this.setState({ user });
//     } catch (ex) {
//       console.log(ex.message);
//     }
//   }

//   handleContentEditable = e => {
//     const item = e.currentTarget.dataset.column;
//     const value = e.target.value;
//     const errors = { ...this.state.errors };
//     const user = this.state.user;
//     user[item] = value;

//     const errorMessage = this.validateProperty(item, value);
//     if (errorMessage) {
//       errors[item] = errorMessage;
//     } else delete errors[item];
//     this.setState({ user, errors });
//   };

//   // handle update with redux
//   handleUpdateRedux = e => {
//     // e.preventDefault()
//     console.log("redux updates", e.target);
//   };

//   // handle udate
//   handleUpdate = async (property, value) => {
//     // Optimistic Update
//     const originalUser = this.state.user;

//     const user = this.state.user;
//     // trim the possible spaces added to the title in the ContentEditable
//     user[property] = this.trimSpaces(value);

//     this.setState({ user });
//     // this.props.updateUser(user._id)

//     try {
//       await userService.updateUser(user._id, {
//         [property]: value
//       });
//       window.location.reload();
//     } catch (ex) {
//       alert("Something went wrong while updating the profile.");
//       this.setState({ user: originalUser });
//     }
//   };

//   // disable new lines in the ContentEditable
//   disableNewlines = event => {
//     const keyCode = event.keyCode || event.which;

//     if (keyCode === 13) {
//       event.returnValue = false;
//       if (event.preventDefault) event.preventDefault();
//     }
//   };

//   // trim the spaces in the ContentEditable
//   trimSpaces = string => {
//     return string
//       .replace(/&nbsp;/g, "")
//       .replace(/&amp;/g, "&")
//       .replace(/&gt;/g, ">")
//       .replace(/&lt;/g, "<");
//   };

//   render() {
//     // REDUX
//     // console.log("Profile Props", this.props)
//     // console.log("Profile State", this.state)
//     // this.props.updateUser(2)

//     const { first_name, last_name, added_date, email } = this.props.user;

//     let db_date = new Date(added_date);
//     db_date = db_date.toDateString();

//     return (
//       <React.Fragment>
//         <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
//           <h1>Profile</h1>
//         </div>
//         <table className="table">
//           <tbody>
//             <tr>
//               <td>First Name</td>
//               <td>
//                 <ContentEditable
//                   html={first_name}
//                   data-column="first_name"
//                   className="content-editable"
//                   onChange={this.handleContentEditable}
//                   onKeyPress={this.disableNewlines}
//                 />
//                 {this.state.errors["first_name"] && (
//                   <div className="alert alert-danger">
//                     {this.state.errors["first_name"]}
//                   </div>
//                 )}
//               </td>
//               <td>
//                 <button
//                   onClick={() => this.handleUpdate("first_name", first_name)}
//                   className="btn btn-sm btn-secondary"
//                   //   disabled={
//                   //     this.state.errors.title && this.state.errors.id === todo._id
//                   //   }
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//             <tr>
//               <td>Last Name</td>
//               <td>
//                 <ContentEditable
//                   html={last_name}
//                   data-column="last_name"
//                   className="content-editable"
//                   onChange={this.handleContentEditable}
//                   onKeyPress={this.disableNewlines}
//                 />
//                 {this.state.errors["last_name"] && (
//                   <div className="alert alert-danger">
//                     {this.state.errors["last_name"]}
//                   </div>
//                 )}
//               </td>
//               <td>
//                 <button
//                   onClick={() => this.handleUpdate("last_name", last_name)}
//                   className="btn btn-sm btn-secondary"
//                   //   disabled={
//                   //     this.state.errors.title && this.state.errors.id === todo._id
//                   //   }
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//             <tr>
//               <td>Email</td>
//               <td>
//                 <ContentEditable
//                   html={email}
//                   data-column="email"
//                   className="content-editable"
//                   onChange={this.handleContentEditable}
//                   onKeyPress={this.disableNewlines}
//                 />
//                 {this.state.errors["email"] && (
//                   <div className="alert alert-danger">
//                     {this.state.errors["email"]}
//                   </div>
//                 )}
//               </td>
//               <td>
//                 <button
//                   onClick={() => this.handleUpdate("email", email)}
//                   className="btn btn-sm btn-secondary"
//                   //   disabled={
//                   //     this.state.errors.title && this.state.errors.id === todo._id
//                   //   }
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//             <tr>
//               <td>Join Date</td>
//               <td>{db_date}</td>
//             </tr>
//           </tbody>
//         </table>
//       </React.Fragment>
//     );
//   }
// }

export default Profile;
