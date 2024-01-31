import React, { memo } from "react";
import { SearchUserData } from "../../redux/slice/searchUserSlice";
import { ImSpinner3 } from "react-icons/im";

type SearchSuggestionProps = {
  elementRef?: React.Ref<HTMLLIElement>;
  focuseIndex?: number;
  handleToAddBreadCrumbs?: (id: number) => void;
};

const SearchSuggestion: React.FunctionComponent<
  SearchUserData & SearchSuggestionProps
> = (props) => {
  const {
    loding,
    searchUserList,
    elementRef,
    focuseIndex,
    noUserFound,
    handleToAddBreadCrumbs,
  } = props;

  return (
    <section className="search_suggestion_container absolute w-[calc(100%-2.5rem)] top-14 bg-white shadow-lg ">
      {loding ? (
        <span className="loading_spinner flex justify-center items-center min-h-64 ">
          <ImSpinner3 className="animate-spin text-4xl " />
        </span>
      ) : (
        <ul className="search_suggestion_user_list max-h-64 overflow-y-auto flex flex-col ">
          {searchUserList.map((user, index) => {
            return (
              <li
                key={user.id}
                className={`search_suggestion_user_item flex items-center px-4 py-1 my-1 ${
                  focuseIndex === index
                    ? "bg-slate-300 border-l-[3px] border-l-black"
                    : ""
                } hover:bg-slate-300`}
                ref={focuseIndex === index ? elementRef : null}
                onClick={() => {
                  handleToAddBreadCrumbs?.(user.id) ?? undefined;
                }}
                data-item={user.id}
              >
                <figure className="max-w-12">
                  <img src={user.image} alt={user.firstName} />
                </figure>
                <article>
                  <h3 className="text-[0.8rem] ml-3">{user.firstName}</h3>
                </article>
              </li>
            );
          })}
        </ul>
      )}
      {noUserFound && (
        <span className="flex justify-center items-center min-h-64">
          {noUserFound}
        </span>
      )}
    </section>
  );
};

export default SearchSuggestion;
