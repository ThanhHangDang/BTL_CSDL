// import * as React from "react";
// import { AppProvider } from "@toolpad/core/AppProvider";
// import { SignInPage } from "@toolpad/core/SignInPage";
// import { useTheme } from "@mui/material/styles";

// export default function Login() {
//   const providers = [{ id: "credentials", name: "Email and Password" }];

//   const theme = useTheme();

//   const signIn = async (provider, formData) => {
//     const promise = new Promise((resolve) => {
//       setTimeout(() => {
//         alert(
//           `Signing in with "${provider.name}" and credentials: ${formData.get("email")}, ${formData.get("password")}`
//         );
//         resolve();
//       }, 300);
//     });
//     return promise;
//   };

//   return (
//     <div>
//       <AppProvider theme={theme}>
//         <SignInPage signIn={signIn} providers={providers} />
//       </AppProvider>
//     </div>
//   );
// }
