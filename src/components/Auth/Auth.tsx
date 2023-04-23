import { Button, Center, Input, Stack, Text } from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Session } from "next-auth";
import { useMutation } from "@apollo/client";
import UserOperations from "../../graphql/operations/user";
import { CreateUsernameData,CreateUsernameVariables } from "@/util/types";

interface IAppProps {
  session: Session | null;
  reloadSession: () => Promise<void>;
}


const Auth: React.FunctionComponent<IAppProps> = ({
  session,
  reloadSession,
}) => {
  const [username, setUsername] = useState("");

  const [createUsername,{data,loading,error}] = useMutation<CreateUsernameData,CreateUsernameVariables>(UserOperations.Mutations.createUsername)



  const onSubmit = async () => {
    if(!username) return;  
    try{
        await createUsername({variables:{username}});
    } catch(err){
        console.log("error",err);
    }
  };    

  return (
    <Center height="100vh">
      <Stack spacing={8} align="center">
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input placeholder="Enter your username" value={username} onChange={(event) =>setUsername(event.target.value)}/>
            <Button width="100%" onClick={onSubmit}>Save</Button>
            <Button onClick={()=>signOut()}>Sign Out</Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">Messenger</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={
                <Image
                  height={20}
                  src="/images/googlelogo.png"
                  width={20}
                  alt="Google Image"
                />
              }
            >
              Sign in with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
