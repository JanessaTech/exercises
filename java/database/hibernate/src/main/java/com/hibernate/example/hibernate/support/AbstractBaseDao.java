package com.hibernate.example.hibernate.support;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.util.List;

public abstract class AbstractBaseDao<T extends Serializable, K extends Serializable> {
    @Autowired
    SessionFactory sessionFactory;

    protected Class<T> entityClass;
    protected String entityName;

    public T createNew(final T entity) {
       Serializable identifier  = sessionFactory.openSession().save(entity);
       return (T)identifier;
   }

    public T get(K id) {
        T entity = sessionFactory.openSession().get(entityClass, id);
        return entity;
   }

    public List<T> findAll() {
       List res = sessionFactory.getCurrentSession().createQuery("FROM " + entityName).list();
       return res;
   }

}
