type FilterButtonProps = {
	filterName: string;
	handleFilter?: any;
};

export const FilterButton = ({ filterName, handleFilter }: FilterButtonProps) => {
	return (
		<button className="filter-btn" onClick={() => handleFilter && handleFilter({})}>
			{filterName}
		</button>
	);
};
