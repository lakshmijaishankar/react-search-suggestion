import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import SearchSuggestion from "../searchsuggestion/SearchSuggestion";
import { useDebounce } from "../hooks/useDebounce";
import { fetchSearchUserList } from "../../redux/slice/searchUserSlice";
import BreadCrumbs from "../breadcrumbs/BreadCrumbs";
import {
  addBreadcrumbs,
  removeBreadCrumbs,
} from "../../redux/slice/breadCrumbsSlice";

const Search: React.FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [itemId, setItemId] = useState<number>(-1);
  const elementRef = useRef<HTMLLIElement>(null);
  const searchStore = useAppSelector((state) => state.searchStore);
  const breadcrumbsStore = useAppSelector((state) => state.breadcrumbsStore);
  const dispatch = useAppDispatch();
  const debounceValue = useDebounce(searchValue, 200);

  useEffect(() => {
    if (debounceValue !== "") {
      dispatch(fetchSearchUserList(debounceValue));
    }
  }, [debounceValue]);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      if (elementRef.current.dataset.item) {
        let dataItem = parseInt(elementRef.current.dataset.item);
        setItemId(dataItem);
      }
    }
  }, [focusedIndex]);

  const handleInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const handleKeyboardInput = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    let index = -1;
    switch (key) {
      case "ArrowDown":
        index = (focusedIndex + 1) % searchStore.searchUserList.length;
        break;
      case "ArrowUp":
        index =
          (focusedIndex - 1 + searchStore.searchUserList.length) %
          searchStore.searchUserList.length;
        break;
      case "Escape":
        setSearchValue("");
        index = -1;
        break;
      case "Enter":
        handleToaddBreadCrumbs(itemId);
        break;
      default:
        break;
    }
    setFocusedIndex(index);
  };

  const handleToaddBreadCrumbs = (itemId: number) => {
    let particularUser = searchStore.searchUserList.find(
      (user) => user.id === itemId
    );
    if (particularUser) {
      dispatch(addBreadcrumbs(particularUser));
    }
  };
  return (
    <section className="search_container min-h-screen flex flex-col">
      <h1 className="text-center text-xl mt-1">Search Suggestion</h1>
      <BreadCrumbs
        className="bread_cumbs_container h-full"
        children={
          <ul className="bread_crumbs_list flex flex-wrap overflow-y-auto space-x-1 px-5 py-1">
            {breadcrumbsStore.breadcrumbsItems.map((breadCrumbs) => {
              return (
                <li
                  className="bread_crumb_item flex items-center bg-black px-2 py-1 rounded-2xl space-x-1 text-white "
                  key={breadCrumbs.id}
                >
                  <img
                    src={breadCrumbs.image}
                    alt={breadCrumbs.firstName}
                    className="max-w-[18px]"
                  />
                  <span className="text-[0.65rem]">
                    {breadCrumbs.firstName}
                  </span>
                  <button
                    type="button"
                    aria-label="delete"
                    onClick={() => {
                      dispatch(removeBreadCrumbs(breadCrumbs.id));
                    }}
                  >
                    <IoIosClose className="text-[1.1rem]" />
                  </button>
                </li>
              );
            })}
          </ul>
        }
      />
      <form action="Get" className="search_form_container mt-4" onSubmit={(e)=>e.preventDefault()}>
        <div className="search_input_box_container flex px-5 relative">
          <input
            type="text"
            className="search_box flex-[1] min-h-12 border rounded-md px-5 focus:outline-0 placeholder:text-black placeholder:font-light text-xl placeholder:text-[16px]"
            placeholder="Search for users..."
            onChange={handleInputSearch}
            onKeyDown={handleKeyboardInput}
            value={searchValue}
          />
          <button
            type="button"
            className="search_buuton absolute min-w-12 flex h-[90%] justify-center items-center p-1 right-6 top-[calc((100%-90%)/2)] "
          >
            <IoSearchOutline className="text-2xl text-black" />
          </button>
          {searchValue !== "" && (
            <SearchSuggestion
              {...searchStore}
              elementRef={elementRef}
              focuseIndex={focusedIndex}
              handleToAddBreadCrumbs={handleToaddBreadCrumbs}
            />
          )}
        </div>
      </form>
    </section>
  );
};

export default Search;
