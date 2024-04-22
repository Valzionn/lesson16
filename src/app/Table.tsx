import {
  PropsWithChildren,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ExpenseType, api } from "./api";
import { ColorContext } from "./ColorContext";

export const DATA = [
  {
    id: 0,
    text: "Some text for id 0",
  },
  {
    id: 1,
    text: "Some text for id 1",
  },
  {
    id: 2,
    text: "Some text for id 2",
  },
  {
    id: 3,
    text: "Some text for id 3",
  },
  {
    id: 4,
    text: "Some text for id 4",
  },
  {
    id: 5,
    text: "Some text for id 5",
  },
  {
    id: 6,
    text: "Some text for id 6",
  },
  {
    id: 7,
    text: "Some text for id 7",
  },
];

type DataType = typeof DATA;

const WhiteTextToggle = () => {
  const { toggleValue } = useContext(ColorContext);
  return <button onClick={toggleValue}>Toggle text color</button>;
};

const Text = () => {
  const { value } = useContext(ColorContext);
  const numberToShow = useMemo(() => Math.floor(Math.random() * 100), []);
  return (
    <p className={`${value ? "text-white" : "text-black"}`}>{numberToShow}</p>
  );
};

const Wrapper = () => {
  return (
    <div className="wrapper border m-4 bg-green-600">
      <WhiteTextToggle />
      <Text />
    </div>
  );
};

const Container = () => {
  console.log("rendering container");
  return (
    <div className="container bg-blue-600 m-4">
      <Wrapper />
    </div>
  );
};

const splitArryInTwo = (data: DataType) => {
  const firstHalf = [...data];
  const secondHalf = firstHalf.splice(firstHalf.length / 2, firstHalf.length);
  return [firstHalf, secondHalf];
};

const Column = ({ children }: PropsWithChildren) => {
  return <div className="column bg-red-600 p-8 m-2">{children}</div>;
};

const [firstColumn, secondColumn] = splitArryInTwo(DATA);

const Table = () => {
  const [whiteText, setWhiteText] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const toggleValue = () => {
    setWhiteText((t) => !t);
  };

  const contextProviderValue = useMemo(
    () => ({
      value: whiteText,
      toggleValue,
    }),
    [whiteText]
  );

  return (
    <ColorContext.Provider value={contextProviderValue}>
      <div className="m-8">
        <p>{count}</p>
        <button
          onClick={() => {
            setCount((s) => s + 1);
          }}
        >
          IncrementCount
        </button>
      </div>
      <div className="flex">
        <Column>
          {firstColumn.map((d, i) => (
            <Container key={d.id} />
          ))}
        </Column>
        <Column>
          {secondColumn.map((d, i) => (
            <Container key={d.id} />
          ))}
        </Column>
      </div>
    </ColorContext.Provider>
  );
};

export default Table;
