/**
 * @fileoverview Datos iniciales para la aplicación TaskMaster
 * @ejercicio Simulacro 6 - TaskMaster
 * @tema UT5, UT6, UT7, UT8
 * @fecha 15/05/2025
 */

/**
 * Datos iniciales para la aplicación TaskMaster
 * @constant
 * @type {Object}
 */
const initialData = {
    /**
     * Lista de proyectos
     * @type {Array}
     */
    projects: [
        {
            id: 1,
            name: 'Rediseño de sitio web',
            description: 'Actualizar el diseño y la experiencia de usuario del sitio web corporativo',
            startDate: '2025-03-15',
            dueDate: '2025-06-30',
            status: 'in-progress',
            priority: 'high',
            teamMembers: [1, 3, 4]
        },
        {
            id: 2,
            name: 'Aplicación móvil',
            description: 'Desarrollo de una aplicación móvil para clientes',
            startDate: '2025-02-01',
            dueDate: '2025-09-30',
            status: 'planning',
            priority: 'medium',
            teamMembers: [2, 5]
        },
        {
            id: 3,
            name: 'Migración a la nube',
            description: 'Migrar los servicios actuales a una infraestructura en la nube',
            startDate: '2025-01-10',
            dueDate: '2025-04-30',
            status: 'completed',
            priority: 'high',
            teamMembers: [1, 2, 3]
        },
        {
            id: 4,
            name: 'Campaña de marketing',
            description: 'Planificación y ejecución de la campaña de marketing Q2',
            startDate: '2025-04-01',
            dueDate: '2025-06-30',
            status: 'in-progress',
            priority: 'medium',
            teamMembers: [4, 5]
        },
        {
            id: 5,
            name: 'Automatización de procesos',
            description: 'Implementar herramientas para automatizar procesos internos',
            startDate: '2025-05-15',
            dueDate: '2025-08-30',
            status: 'planning',
            priority: 'low',
            teamMembers: [2, 3]
        }
    ],

    /**
     * Lista de tareas
     * @type {Array}
     */
    tasks: [
        {
            id: 1,
            projectId: 1,
            title: 'Análisis de requisitos',
            description: 'Recopilar y analizar los requisitos del cliente para el rediseño',
            status: 'completed',
            priority: 'high',
            dueDate: '2025-03-30',
            assignedTo: 1
        },
        {
            id: 2,
            projectId: 1,
            title: 'Diseño de wireframes',
            description: 'Crear wireframes para las principales páginas del sitio',
            status: 'completed',
            priority: 'high',
            dueDate: '2025-04-15',
            assignedTo: 3
        },
        {
            id: 3,
            projectId: 1,
            title: 'Desarrollo frontend',
            description: 'Implementar el diseño en HTML, CSS y JavaScript',
            status: 'in-progress',
            priority: 'medium',
            dueDate: '2025-05-15',
            assignedTo: 4
        },
        {
            id: 4,
            projectId: 1,
            title: 'Integración backend',
            description: 'Conectar el frontend con los servicios backend',
            status: 'pending',
            priority: 'medium',
            dueDate: '2025-06-15',
            assignedTo: 3
        },
        {
            id: 5,
            projectId: 2,
            title: 'Definición de arquitectura',
            description: 'Definir la arquitectura de la aplicación móvil',
            status: 'completed',
            priority: 'high',
            dueDate: '2025-02-28',
            assignedTo: 2
        },
        {
            id: 6,
            projectId: 2,
            title: 'Diseño de UI/UX',
            description: 'Diseñar la interfaz de usuario y experiencia de usuario',
            status: 'in-progress',
            priority: 'high',
            dueDate: '2025-04-01',
            assignedTo: 5
        },
        {
            id: 7,
            projectId: 3,
            title: 'Evaluación de proveedores',
            description: 'Evaluar diferentes proveedores de servicios en la nube',
            status: 'completed',
            priority: 'high',
            dueDate: '2025-01-31',
            assignedTo: 1
        },
        {
            id: 8,
            projectId: 3,
            title: 'Migración de datos',
            description: 'Migrar datos a la nueva infraestructura',
            status: 'completed',
            priority: 'high',
            dueDate: '2025-03-15',
            assignedTo: 2
        },
        {
            id: 9,
            projectId: 3,
            title: 'Pruebas de rendimiento',
            description: 'Realizar pruebas de rendimiento en la nueva infraestructura',
            status: 'completed',
            priority: 'medium',
            dueDate: '2025-04-15',
            assignedTo: 3
        },
        {
            id: 10,
            projectId: 4,
            title: 'Estrategia de contenido',
            description: 'Desarrollar la estrategia de contenido para la campaña',
            status: 'completed',
            priority: 'high',
            dueDate: '2025-04-15',
            assignedTo: 4
        },
        {
            id: 11,
            projectId: 4,
            title: 'Diseño de material publicitario',
            description: 'Diseñar material gráfico para la campaña',
            status: 'in-progress',
            priority: 'medium',
            dueDate: '2025-05-15',
            assignedTo: 5
        },
        {
            id: 12,
            projectId: 5,
            title: 'Análisis de procesos',
            description: 'Analizar los procesos actuales e identificar áreas de mejora',
            status: 'completed',
            priority: 'high',
            dueDate: '2025-06-15',
            assignedTo: 2
        },
        {
            id: 13,
            projectId: 5,
            title: 'Selección de herramientas',
            description: 'Evaluar y seleccionar herramientas de automatización',
            status: 'in-progress',
            priority: 'medium',
            dueDate: '2025-07-15',
            assignedTo: 3
        }
    ],

    /**
     * Lista de miembros del equipo
     * @type {Array}
     */
    team: [
        {
            id: 1,
            name: 'Ana García',
            role: 'Project Manager',
            email: 'ana.garcia@example.com',
            avatar: '👩‍💼',
            skills: ['Gestión de proyectos', 'Comunicación', 'Liderazgo']
        },
        {
            id: 2,
            name: 'Carlos Rodríguez',
            role: 'Backend Developer',
            email: 'carlos.rodriguez@example.com',
            avatar: '👨‍💻',
            skills: ['Java', 'Python', 'Bases de datos', 'Cloud']
        },
        {
            id: 3,
            name: 'Elena Martínez',
            role: 'Full-stack Developer',
            email: 'elena.martinez@example.com',
            avatar: '👩‍💻',
            skills: ['JavaScript', 'React', 'Node.js', 'MongoDB']
        },
        {
            id: 4,
            name: 'Miguel López',
            role: 'Frontend Developer',
            email: 'miguel.lopez@example.com',
            avatar: '👨‍🎨',
            skills: ['HTML', 'CSS', 'JavaScript', 'React', 'UI/UX']
        },
        {
            id: 5,
            name: 'Laura Sánchez',
            role: 'Designer',
            email: 'laura.sanchez@example.com',
            avatar: '👩‍🎨',
            skills: ['UI/UX', 'Figma', 'Adobe XD', 'Ilustración']
        }
    ]
};

export default initialData;
