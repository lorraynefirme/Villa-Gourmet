import { productList } from "data/product";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(
    "https://api-produtos-one.vercel.app/api/products",
    ({ request }) => {
      const url = new URL(request.url);

      const page = url.searchParams.get("page");
      const limit = url.searchParams.get("limit");
      let data = productList;

      if (page && limit) {
        const start = (+page - 1) * +limit;
        const end = +page * +limit;
        data = productList.slice(start, end);

        if (+page < 0) {
          return new HttpResponse(
            JSON.stringify({
              message: "A página deve ser maior do que 0",
            }),
            {
              status: 400,
            }
          );
        }
      }

      const result = data;
      const count = productList.length.toString();

      return HttpResponse.json(result, {
        headers: {
          "x-total-count": count,
        },
      });
    }
  ),

  http.get(
    "https://api-produtos-one.vercel.app/api/products/:id",
    ({ params }) => {
      const { id } = params;

      if (id) {
        const result = productList.find((item) => item.id === +id);

        if (result) return HttpResponse.json(result);
      }

      return new HttpResponse(
        JSON.stringify({
          message: `O produto do id ${id} não foi encontrado`,
        }),
        {
          status: 404,
        }
      );
    }
  ),
];
