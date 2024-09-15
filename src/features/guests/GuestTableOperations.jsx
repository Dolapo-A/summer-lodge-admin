import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function GuestTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField="gender"
				options={[
					{ value: "all", label: "All" },
					{ value: "male", label: "Male" },
					{ value: "female", label: "Female" },
				]}
			/>

			<SortBy
				options={[
					{ value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          
				]}
			/>
		</TableOperations>
	);
}

export default GuestTableOperations;
