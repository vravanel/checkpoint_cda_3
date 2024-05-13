import Countries from "@/components/Countries";
import Form from "@/components/Form";
import Header from "@/components/Header";
import { GetCountriesQuery } from "@/graphql/generated/schema";
import { gql, useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const GET_COUNTRIES = gql`
  query getCountries {
    countries {
      id
      emoji
      code
      name
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery<GetCountriesQuery>(GET_COUNTRIES);

  if (loading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  if (error) return <div>Quelque chose n'a pas fonctionné ...</div>;

  return (
    <>
      <Header />
      <main>
        <Form />
        <div className="container-countries">
          {data?.countries ? (
            data.countries.map((country) => (
              <a href={`/country/${country.code}`}>
                <Countries
                  key={country.id}
                  name={country.name}
                  emoji={country.emoji}
                />
              </a>
            ))
          ) : (
            <p>Aucun pays trouvé</p>
          )}
        </div>
      </main>
    </>
  );
}
