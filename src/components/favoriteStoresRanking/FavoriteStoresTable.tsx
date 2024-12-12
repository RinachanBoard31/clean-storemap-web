import React from "react";
import "../../css/favoriteStoresRanking/favoriteStoresRanking.css";
import { Store } from "../../types/store";
import { PriceLevelIcons } from "../icons/PriceLevelIcons";
import { AiOutlineCrown } from "react-icons/ai";

type Props = {
  stores: Store[];
};

export const FavoriteStoresTable: React.FC<Props> = ({ stores }) => (
  <div className="favorite-stores-table">
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Store Name</th>
          <th>Regular Hours</th>
          <th className="price-level-header">Price Level</th>
        </tr>
      </thead>
      <tbody>
        {stores.map((store, index) => (
          <tr
            key={store.id}
            className={`favorite-stores-row rank-${index}`}
            data-rank={index}
          >
            <td>
              {index < 3 ? (
                <span className="rank-icon">
                  <AiOutlineCrown
                    style={{
                      color:
                        index === 0 ? "gold" : index === 1 ? "silver" : "#cd7f32",
                    }}
                  />
                </span>
              ) : (
                index + 1
              )}
            </td>
            <td className={`store-name rank-${index}`}>{store.name}</td>
            <td>{store.regularOpeningHours}</td>
            <td className="price-level-cell">
              <PriceLevelIcons priceLevel={store.priceLevel} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
