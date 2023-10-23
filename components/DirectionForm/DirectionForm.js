import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";

const URL_GEO_API = "https://geocode.maps.co/search?";

const directionSchema = Yup.object({
  direction: Yup.string().required(),
  province: Yup.string().required(),
});

export default function DirectionForm({ setPosition }) {
  const form = useForm({
    resolver: yupResolver(directionSchema),
    defaultValues: {
      province: "Tucuman",
      department: "Capital",
    },
  });
  const [departmentList, setDepartmentList] = useState();
  const [province, setProvince] = useState("Tucuman");
  const [department, setDepartment] = useState("Capital");
  const [directionSuggestions, setDirectionSuggestions] = useState([]);
  const [direction, setDirection] = useState("");
  const [openSuggestions, setOpenSuggestions] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState("");

  function handleSubmit(data) {
    console.log(data);
    const direction = String(data.direction);
    const searchParams = new URLSearchParams();
    searchParams.append(
      "q",
      direction +
        " " +
        department
          .replace(/ /g, "+")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") +
        " " +
        province +
        " " +
        "Argentina"
    );
    fetch(URL_GEO_API + String(searchParams))
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setDirectionSuggestions(json);
      });
  }

  function getDepartmentBasedInProvince(province) {
    const URL_API_DEP =
      "https://apis.datos.gob.ar/georef/api/departamentos?provincia=";
    // Check if the department list exist in localStorage
    const departmentLocalStorage = localStorage.getItem(
      `department-list-${province}`
    );
    if (!departmentLocalStorage) {
      fetch(URL_API_DEP + province + "&orden=nombre&max=20")
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          const names = json.departamentos.map((el) => {
            return { nombre: el.nombre, id: el.id, centroide: el.centroide };
          });
          localStorage.setItem(
            `department-list-${province}`,
            JSON.stringify(names)
          );
          setDepartmentList(names);
        });
      return;
    }
    setDepartmentList(JSON.parse(departmentLocalStorage));
  }

  function getDirectionSuggestionsBasedOnText(text) {
    const searchParams = new URLSearchParams();
    searchParams.append(
      "q",
      text + " " + department + " " + province + " " + "Argentina"
    );
    setDepartmentList([]);
    fetch(URL_GEO_API + String(searchParams))
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.length === 0) {
          setDirectionSuggestions([
            { display_name: "No se encontraron resultados." },
          ]);
          return;
        }
        setDirectionSuggestions(json);
      });
  }

  function handleChangeDirection(e) {
    console.log(e.target.value);
    const value = e.target.value;
    setTimeout(() => {
      if (value.length <= 3) {
        setDirectionSuggestions([
          { display_name: "Ingresa por lo menos 4 letras" },
        ]);
        return;
      }
      getDirectionSuggestionsBasedOnText(value);
    }, 2500);
  }
  useEffect(() => {
    console.log(direction);
    if (direction.length === 0) {
      setDirectionSuggestions([{ display_name: "Ingresa una dirección" }]);
      return;
    }
    if (direction.length <= 3) {
      setDirectionSuggestions([
        { display_name: "Ingresa por lo menos 4 letras" },
      ]);
      return;
    }
    const timeoutID = setTimeout(() => {
      getDirectionSuggestionsBasedOnText(direction);
    }, 2500);

    return () => clearTimeout(timeoutID);
  }, [direction]);

  useEffect(() => {
    if (!province) {
      getDepartmentBasedInProvince("Tucuman");
      return;
    }
    getDepartmentBasedInProvince(province);
  }, [province]);
  return (
    <section>
      <h2>Datos del domicilio</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provincia</FormLabel>
                <Select
                  onValueChange={(e) => {
                    field.onChange(e);
                    setProvince(e);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Tucuman">Tucuman</SelectItem>
                    <SelectItem value="Jujuy">Jujuy</SelectItem>
                    <SelectItem value="Santiago del Estero">
                      Santiago del estero
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Seleccione su provincia</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departamento</FormLabel>
                <Select
                  onValueChange={(e) => {
                    field.onChange(e);
                    setDepartment(e);
                    const selectedDepartment = departmentList.find(
                      (el) => el.nombre === e
                    );
                    console.log(selectedDepartment);
                    setPosition([
                      Number(selectedDepartment.centroide.lat),
                      Number(selectedDepartment.centroide.lon),
                    ]);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un departamento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-52 overflow-y-scroll">
                    {departmentList && (
                      <>
                        {departmentList.map((dep, index) => {
                          if (index === 0) {
                            return (
                              <SelectItem
                                key={dep.id}
                                value={dep.nombre}
                                selected
                              >
                                {dep.nombre}
                              </SelectItem>
                            );
                          }
                          return (
                            <SelectItem key={dep.id} value={dep.nombre}>
                              {dep.nombre}
                            </SelectItem>
                          );
                        })}
                        <SelectItem selected value="load">
                          Cargar más
                        </SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Seleccione un departamento de la lista
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="direction"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input
                    type="search"
                    placeholder="Ingrese su dirección"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      setDirection(e.target.value);
                    }}
                    onBlur={(e) => field.onBlur(e)}
                    // {...field}
                  />
                </FormControl>
                {openSuggestions ? (
                  <Card>
                    <CardContent className="pb-1">
                      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                        {directionSuggestions.map((el) => (
                          <li
                            className="hover:underline cursor-pointer"
                            onClick={() => {
                              form.setValue("direction", el.display_name);
                              if (el?.lat && el?.lon) {
                                setPosition([Number(el.lat), Number(el.lon)]);
                              }
                            }}
                            key={el.display_name}
                          >
                            {el.display_name}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ) : (
                  ""
                )}
                <FormDescription>
                  Seleccione su dirección de la lista
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Enviar</Button>
        </form>
      </Form>
    </section>
  );
}
