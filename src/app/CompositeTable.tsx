import { PropsWithChildren, memo, useEffect, useState } from "react";
import { ExpenseType, api } from "./api";

const DATA = [
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

const Text = ({ text }: { text: string }) => {
  return <p>{text}</p>;
};

const Wrapper = ({ children }: PropsWithChildren) => {
  return <div className="wrapper border m-4 bg-green-600">{children}</div>;
};

const Container = ({ children }: PropsWithChildren) => {
  return <div className="container bg-blue-600 m-4">{children}</div>;
};

const splitArryInTwo = (data: typeof DATA) => {
  const firstHalf = [...data];
  const secondHalf = firstHalf.splice(firstHalf.length / 2, firstHalf.length);
  return [firstHalf, secondHalf];
};

const Column = ({ children }: PropsWithChildren) => {
  return <div className="column bg-red-600 p-8 m-2">{children}</div>;
};

const [firstColumn, secondColumn] = splitArryInTwo(DATA);

const CompositeTable = () => {
  const [data, setData] = useState<typeof DATA>(DATA);
  const [count, setCount] = useState<number>(0);

  const handleDelete = (id: number) => {
    api.deleteExpense(id);
  };

  return (
    <>
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
          {firstColumn.map((d) => (
            <Container key={d.id}>
              <Wrapper>
                <Text text={d.text} />
              </Wrapper>
            </Container>
          ))}
        </Column>
        <Column>
          {secondColumn.map((d) => (
            <Container key={d.id}>
              <Wrapper>
                <Text text={d.text} />
              </Wrapper>
            </Container>
          ))}
        </Column>
      </div>
    </>
  );
};

export default CompositeTable;
