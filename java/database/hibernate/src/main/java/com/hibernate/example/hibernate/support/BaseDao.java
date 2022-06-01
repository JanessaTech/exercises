package com.hibernate.example.hibernate.support;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

/**
 * Generic BaseDA interface
 *
 * @param < T > entity object type
 */
interface BaseDao<T> {

    /**
     * Creates a new < T > entity object, set createdTime
     * if exists
     *
     * @param < T > entity object to be create
     * @return newly created entity object
     */
    T createNew(T entity);

    /**
     * Create list of T entity with batch settings
     *
     * @param list - new entity list
     *
     * @return - created entity size
     */
    int createBatchNew(Collection<T> list);

    /**
     * Gets < T > entity by entity id
     *
     * @return < T > entity found by id
     * @throws NoSuchElementException if element not found
     */
    T get(Object id);

    /**
     * Gets < T > entity by entity id
     * @param id
     * @return found entity or null if not found
     */
    T getOrNull(Object id);

    /**
     * Updates < T > entity
     *
     * @return updated entity
     */
    T update(T entity);

    /**
     * Update < T > entity and flush change to storage.
     * @param entity
     * @return
     */
    T updateAndFlush(T entity);

    /**
     * Save new < T > or update existing < T >
     * @param entity
     * @return
     */
    T saveOrUpdate(T entity);

    /**
     * Updates < T > entity's field by id
     *
     * @return 1 if value was updated
     * @param id - Id of the entity
     * @param field - Name of the entity field
     * @param value - Value of the entity
     */
    int updateField(Long id, String field, Object value);

    /**
     * Update by entity id list
     * <p>
     * @param ids - Id list
     * @param field - field name
     * @param value - value
     * @return - number of updated entity
     */
    int updateFieldIdIn(List<Long> ids, String field, Object value);

    /**
     * Updates < T >  entity's fields by id
     *
     * @return 1 if value was updated
     * @param id - Id of the entity
     * @param values - Map of values
     * @return Number of rows updated
     */
    int updateFields(Long id, Map<String, Object> values);

    /**
     * Updates < T >  entity's fields by id, and flush the change to underlying persistent if <code>flush</code> is true.
     *
     * @param id - Id of the entity
     * @param values - Map of values
     * @param flush - set to true to sync change to underlying persistent
     * @return Number of rows updated
     */
    int updateFields(Long id, Map<String, Object> values, Boolean flush);

    /**
     * Updates field value in entity with optimistic lock, if field is not updated
     * then IllegalStateException is thrown.
     * <p>
     * @return most up-to-date vaue of the entity
     * @param id - Id of the entity
     * @param field - Name of the entity field
     * @param value - Value of the entity
     */
    T optimisticUpdateField(Long id, Long version, String field, Object value);

    /**
     * Returns count of the list
     *
     * @return count of list
     */
    Long count();

    /**
     * Returns count of the list based on the field
     *
     * @param field - name of the field
     * @param value - value of the field
     * @return count of list
     */
    Long countByField(String field, Long value);


    /**
     * Gets entity by column, it's assumed that the field
     * is unique field
     *
     * @param field name of the column
     * @param value of the column
     * @return found entity
     * @throws NoSuchElementException if element not found
     */
    T getBy(String field, Object value);

    /**
     * Gets entity by siteId and column, it's assumed that the field
     * is unique field, and siteId exists in the entity
     *
     * @param siteId
     * @param value of the column
     * @return found entity
     * @throws NoSuchElementException if element not found
     */
    T getBy(Integer siteId, String column, Object value);

    /**
     * Returns map of asked fields, if not found then empty map is returned
     *
     * @param id - Id of the entity
     * @param fields - List of fields
     * @return - Map of the found fields
     */
    Map<String, Object> findFields(Object id, List<String> fields);

    /**
     * Loads all entity objects
     *
     * @return List of <T> objects
     */
    Collection<T> findAll();

    /**
     * Loads all entity objects by field value
     *
     * @return List of <T> objects
     */
    List<T> findBy(String field, Object value);

    /**
     * Loads all entity objects by list of field values
     * <p>
     * @param field - field name
     * @param values - list of values
     * @return - List of <T> objects
     */
    List<T> findBy(String field, List<Object> values);

    /**
     * Loads all entity objects by siteId and field value
     *
     * @param siteId
     * @param field
     * @param value
     * @return
     */
    List<T> findBy(Integer siteId, String field, Object value);

    /**
     * Delete entity
     */
    void delete(T value);

    /**
     * Deletes entity by field name
     * <p>
     * @param field - Mapping for entity field name
     * @param value - Value of the field
     * @return int - number of rows deleted
     */
    int deleteBy(String field, Object value);

    /**
     * Delete entity by field list value
     * <p>
     * @param field - Mapping for entity field name
     * @param values - Values of the field
     * @return
     */
    int deleteByList(String field, List<Object> values);

    /**
     * Executes call in database with given values
     * <p>
     * @param sql - procedure call
     * @param values - Map of values for stored procedure calls
     */
    void executeCall(String sql, Map<String, Object> values);


    /**
     * Get fields values using the provided sql and params. The fields values are read directly from db.
     *
     * @param sql The sql to execute
     * @param params The params of the object to read
     * @return fields values
     */
    Collection<Object> getFields(String sql, Map<String,Object> params);
}
