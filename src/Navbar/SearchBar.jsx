import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    return (
        <div className="border border-green-500 rounded-lg flex items-center px-1 gap-x-1">
            <SearchIcon className='text-gray-400' sx={{ fontSize: 30 }} ></SearchIcon>
            <input type="text" name="search" id="search" className="w-full focus:outline-none py-2 rounded" placeholder="Search"/>
        </div>
    );
}
 
export default SearchBar;