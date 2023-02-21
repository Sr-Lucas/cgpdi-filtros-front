type FilterButtonProps = {
	filterName: string;
	handleFilter: () => void;
};

export const FilterButton = ({ filterName, handleFilter }: FilterButtonProps) => {
	return <button onClick={() => handleFilter()}>{filterName}</button>;
};
