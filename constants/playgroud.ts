export type TAB = "JavaScript" | "Python" | "cURL";

export const TABS: TAB[] = ["JavaScript", "Python", "cURL"];

export const CODESNIPPETS = {
  JavaScript: `const res = await fetch(
      "https://freeapihub.up.railway.app/api/v1/public/books/",
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data.results);`,

  Python: `import requests
  
  response = requests.get(
  "https://freeapihub.up.railway.app/api/v1/public/books/"
  )
  
  data = response.json()["results"]
  
  print(data)`,

  cURL: `curl -X GET \\
  "https://freeapihub.up.railway.app/api/v1/public/books/" \\
  -H "accept: application/json"`,
};
