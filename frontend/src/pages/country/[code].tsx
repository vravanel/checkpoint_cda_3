import Header from "@/components/Header";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const GET_COUNTRY = gql`
  query Country($code: String!) {
    country(code: $code) {
      code
      emoji
      id
      name
      continent {
        name
      }
    }
  }
`;

export default function Country() {
  const router = useRouter();
  const { code } = router.query;
  const { data, loading } = useQuery(GET_COUNTRY, {
    variables: { code: code as string },
  });

  if (loading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress color="secondary" />
      </Box>
    );

  if (data) {
    const { country } = data;
    return (
      <>
        <Header />
        <main>
          <h1 className="country-emoji">{country.emoji}</h1>
          <p>
            Name : {country.name} ({country.code})
          </p>
          {country.continent ? (
            <p>Continent : {country.continent.name}</p>
          ) : (
            <div>Quelque chose n'a pas fonctionné ...</div>
          )}
        </main>
      </>
    );
  }
}
