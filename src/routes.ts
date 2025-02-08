export interface AppRoutes {
  home: string;
  product: (id: number) => string;
}

export const routes: AppRoutes = {
  home: "/",
  product: (id) => `/detalhes/${id}`,
};
