import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import useAuthCall from "../hooks/useAuthCall";

//! Yup ile istediğimiz alanlara istediğimiz validasyon koşullarını oluşturuyoruz. Sonra oluşturduğumuz bu şemayı formike tanımlayarak kullanıyoruz. Böylelikle formik hem formumuzu yönetiyor hem de verdiğimiz validationSchema yı uyguluyor. Dikkat edilmesi gereken husus; formikte tanımladığımız initialValues daki keylerle, Yupta tanımladığımız keylerin aynı olması. Eğer bir harf bile farklı olsa o alanla ilgili yazdığınız validation çalışmaz.
const SignupSchema = Yup.object().shape({
  username: Yup.string().min(2).max(50, "Too Long!").required("Required"),
  first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"), // hata mesajını bu şekilde customize edebiliriz. Mesaj yazmazsak default mesajını gösterir.
  password: Yup.string()
    .min(8, "En az 8 karakter uzunluğunda olması gerekir!")
    .max(50, "Too Long!")
    .matches(/\d+/, "En az bir tane rakam içermelidir!")
    .matches(/[a-z]/, "En az bir tane küçük harf içermelidir!")
    .matches(/[A-Z]/, "Password bir büyük harf içermelidir")
    .matches(/[!,?{}><%&$#£+-.]+/, "Password bir özel karakter içermelidir") //regex
    .required("Required"),
  password2: Yup.string()
    .oneOf([Yup.ref("password")], "Password aynı olmak zorundadır!")
    .required(),
});

const Register = () => {
  const register = useAuthCall();
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}>
        <Grid item xs={12}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}>
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={2}
            color="secondary.light">
            Register
          </Typography>

          <Formik
            initialValues={{
              username: "",
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              password2: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, actions) => {
              console.log(values);
              register(values);
              actions.resetForm(); //initialValuse geri döndürür.
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    name="username"
                    label="Username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)} // error: true or false
                    helperText={touched.username && errors.username}
                  />
                  {/* error ve helperText propertyleri Textfield componentine ait propertyler. */}
                  {/* mui textfield kullanmadığımzda <span>{touched.username && errors.username}</span> */}
                  <TextField
                    id="first_name"
                    label="First Name"
                    type="text"
                    variant="outlined"
                    name="first_name"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.first_name && errors.first_name} //validationda verdiğimiz kalıba uymazsa ilgili mesajları göstermesi için
                    error={touched.first_name && errors.first_name} //validationda verdiğimiz kalıba uymazsa rengi errora çevirmesi için
                  />
                  <TextField
                    id="last_name"
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    name="last_name"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.last_name && errors.last_name} //validationda verdiğimiz kalıba uymazsa ilgili mesajları göstermesi için
                    error={touched.last_name && errors.last_name} //validationda verdiğimiz kalıba uymazsa rengi errora çevirmesi için
                  />
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email && errors.email} //validationda verdiğimiz kalıba uymazsa ilgili mesajları göstermesi için
                    error={touched.email && errors.email} //validationda verdiğimiz kalıba uymazsa rengi errora çevirmesi için
                  />
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password && errors.password} //validationda verdiğimiz kalıba uymazsa ilgili mesajları göstermesi için
                    error={touched.password && errors.password} //validationda verdiğimiz kalıba uymazsa rengi errora çevirmesi için
                  />
                  <TextField
                    id="password2"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    name="password2"
                    value={values.password2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password2 && errors.password2} //validationda verdiğimiz kalıba uymazsa ilgili mesajları göstermesi için
                    error={touched.password2 && errors.password2} //validationda verdiğimiz kalıba uymazsa rengi errora çevirmesi için
                  />
                  <Button type="submit" variant="contained" size="large">
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/">Already have an account? Sign in</Link>
          </Box>
        </Grid>

        <Grid item xs={0} sm={7} md={6}>
          <Container>
            <img src={image} alt="" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
