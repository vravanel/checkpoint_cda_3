import {
  CreateCountryMutation,
  CreateCountryMutationVariables,
  GetContinentsQuery,
} from "@/graphql/generated/schema";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CREATE_COUNTRY = gql`
  mutation CreateCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      code
      emoji
      name
      continent {
        id
      }
    }
  }
`;

const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      id
      name
    }
  }
`;

export default function Form() {
  const [newCountry, setNewCountry] = useState<CreateCountryMutationVariables>({
    data: {
      code: "",
      emoji: "",
      name: "",
      continent: {
        id: 1,
      },
    },
  });

  const { loading, error, data } = useQuery<GetContinentsQuery>(GET_CONTINENTS);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setNewCountry((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  }

  const [createCountry] = useMutation<
    CreateCountryMutation,
    CreateCountryMutationVariables
  >(CREATE_COUNTRY);

  const createNewCountry = async () => {
    try {
      const { data } = await createCountry({
        variables: {
          data: {
            code: newCountry.data.code,
            emoji: newCountry.data.emoji,
            name: newCountry.data.name,
            continent: {
              id: newCountry.data.continent?.id || 1,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  if (error) return <div>Quelque chose n'a pas fonctionné ...</div>;

  return (
    <form action="" method="post">
      <div className="form-container">
        <label htmlFor="name">Name</label>
        <input type="text" id="label" name="name" onChange={handleChange} />
      </div>
      <div className="form-container">
        <label htmlFor="emoji">Emoji</label>
        <input type="text" id="label" name="emoji" onChange={handleChange} />
      </div>
      <div className="form-container">
        <label htmlFor="code">Code</label>
        <input type="text" id="code" name="code" onChange={handleChange} />
      </div>
      <div className="form-container">
        <label htmlFor="continent">Continent</label>
        <select id="code" name="continent" onChange={handleChange}>
          <option value="">Choisir un continent</option>
          {data?.continents.map((continent) => (
            <option value={continent.id} key={continent.id}>
              {continent.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-container">
        <button type="submit" onClick={createNewCountry}>
          Add
        </button>
      </div>
    </form>
  );
}
